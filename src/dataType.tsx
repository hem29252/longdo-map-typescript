export type typeUsers = {
  id: number;
  user_id: number;
  name: string;
  amount: number;
  email: string;
  tel: string;
  lat: number;
  long: number;
  description: string;
  createAt: Date;
}

export type typeVaccine = {
    id: number,
    name: string
    amount: number,
    lat: number,
    long: number,
    email: string,
    tel: string,
    description: string,
}

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    })
  } 

