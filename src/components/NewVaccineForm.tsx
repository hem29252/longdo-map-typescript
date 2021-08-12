import React from 'react'
import axios from 'axios'
import { map, longdo, LondogMapNewVaccine } from './LondogMapNewVaccine'
import { Form, Button, Select, Row, Col, Input, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';

const NewVaccineForm = () => {
    const mapKey: string = 'f065b431c7c8afab7264d32ca7a8a11e'
    const { TextArea } = Input
    const [suggestions, setSuggestions] = React.useState<any[]>([])
    const style = { background: '#0092ff', padding: '8px 0' };
    // initial map
    const initMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
        map.zoom(5)
    }


    const onChangeSeach = async (e:any) => {
        let res = await axios.get(`https://search.longdo.com/mapsearch/json/search?keyword=${e.target.value}&limit=20&key=${mapKey}`)
        setSuggestions(res.data)
        console.log(suggestions)
    }

    const search = async () => {
        let res = await axios.get(`https://search.longdo.com/mapsearch/json/search?keyword=กรุงเทพ&area=10&span=100km&limit=20&key=${mapKey}`)
        console.log(res.data)
    }

    return (
        <div>
            <Row>
                <Col span={12} offset={6}>
                    <Row> 
                        <Col span={24} >
                            <h4 style={{ textAlign: 'left' }}>Valccine name</h4>
                            <Input />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}   >
                            <h4 style={{ textAlign: 'left' }}>Amount dosage</h4>
                            <InputNumber min={1} max={10} defaultValue={1} style={{ float: 'left', width: '100%'}} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}   >
                            <h4 style={{ textAlign: 'left' }}>Email</h4>
                            <Input />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}   >
                            <h4 style={{ textAlign: 'left' }}>Telephone</h4>
                            <Input />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}   >
                            <h4 style={{ textAlign: 'left' }}>Description</h4>
                            <TextArea />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}   >
                            <h4 style={{ textAlign: 'left' }}>Address</h4>
                            <div style={{ height: '200px' }}>
                                <LondogMapNewVaccine id="longdo-map" mapKey={mapKey} callback={initMap} />
                                <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                                    <Input onKeyUp={onChangeSeach.bind(this)} placeholder='search address'/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div style={{ paddingBottom: '200px' }}></div>
        </div>
    )
}

export default NewVaccineForm