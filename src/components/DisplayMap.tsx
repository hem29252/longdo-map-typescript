import React, { useEffect, useState } from 'react';
import { map, longdo, LongdoMap } from './LongdoMap'
import { typeVaccine, typeDeocode } from '../dataType';
import { Drawer, Button } from 'antd';
import axios from 'axios';

const DisplayMap = () => {
    const [vaccine, setVaccine] = useState<typeVaccine[]>([])
    const [country, setCountry] = useState<string>()
    const [geocode, setGeocode] = useState<string>("")
    const [province, setProvince] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [subdistrict, setSubdistrict] = useState<string>("")
    const [postcode, setPostcode] = useState<string>("")
    const [elevation, setElevation] = useState<number | undefined>()
    const [road, setRoad] = useState<String>("")
    // longdo key api
    const mapKey: string = 'f065b431c7c8afab7264d32ca7a8a11e'

    // drawer visible
    const [visible, setVisible] = useState(false);

    // open drawer
    const showDrawer = () => {
        setVisible(true);
    };

    // close drawer
    const onClose = () => {
        setVisible(false);
    };

    // initial map
    const initMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
    }

    // feth api vaccine
    const fecthVaccineData = async () => {
        let res = await fetch('http://localhost:3003/vaccine')
        let data = await res.json()
        setVaccine([...data.data])
        setTimeout(() => {
            setMarker()
        }, 1000)
    }

    const mapLatLonToAddress = async (lat: number,lon:number) => {
        await axios(`https://api.longdo.com/map/services/address?lon=${lon}&lat=${lat}&key=f065b431c7c8afab7264d32ca7a8a11e`)
        .then((res) => {
            setCountry(res.data.country)
            setProvince(res.data.province)
            setGeocode(res.data.geocode)
            setDistrict(res.data.district)
            setSubdistrict(res.data.subdistrict)
            setPostcode(res.data.postcode)
            setElevation(res.data.elevation)
            setRoad(res.data.road)
            console.log(res.data)

        })
      }



    // set marker vaccine
    const setMarker = () => {
        let vaccineList: any = []
        vaccine.forEach((item, index) => {
            vaccineList[index] = new longdo.Marker({ lon: item.long, lat: item.lat })
            map.Overlays.add(vaccineList[index])
            map.Event.bind('overlayClick', function (overlay: any) {
                if (overlay === vaccineList[index]) {
                    mapLatLonToAddress(item.lat, item.long)
                    showDrawer()
                }
            });
        })
    }

    // hook
    useEffect(() => {
        fecthVaccineData()
    }, [vaccine.length, country, province, geocode, district])


    return (
        <div>
            <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
            <Drawer
                title="Vaccine"
                onClose={onClose}
                visible={visible}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={onClose} type="primary">
                            เส้นทาง
                        </Button>
                    </div>
                }
            >
        <p>{ country }</p>
        <p>{ province }</p>
        <p>{ geocode }</p>
        <p>{ district }</p>

        
            </Drawer>
        </div>
    )
}

export default DisplayMap;
