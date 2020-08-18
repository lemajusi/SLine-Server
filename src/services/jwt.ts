import jwt from 'jwt-simple';

let secretKey = "Mb18jl5OMdq8gl5Eu6aqd-YgdQu7E1d3-mdg3FFaarPNB40IJgFZgOBUfbd_o9x1";

export class JwtService{
    public async createToken(payload: JSON){
        try {
            let promise = new Promise((resolve) => {
                resolve(jwt.encode(payload, secretKey));
            });

            return promise;
        } catch (error) {
            console.log(error)
        }
    }
}