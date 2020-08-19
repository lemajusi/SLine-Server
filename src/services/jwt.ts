import jwt from 'jwt-simple';

let secretKey = "MIIDDTCCAfWgAwIBAgIJQPsMoJtBf61BMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lOG85ODdtaS51cy5hdXRoMC5jb20wHhcNMjAwODExMTkwODIwWhcNMzQwNDIwMTkwODIwWjAkMSIwIAYDVQQDExlkZXYtZThvOTg3bWkudXMuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArt4Z4CEWBEQ7/78a0TT6stwCCO3I04Ih2v4JvW7Q2tXrHjkw+/+PP3G29+L5qupEdkVF8cn4CZ3igN8/C8WwyXR2F1li2AyKxrZsTSIB0crDgf4CQ5iom+yfQPdLYxrl33VprbLfKgD9Z1OYnMsnLLGT3dPQopzjSpA59Tw32aWT6uSGiTetmsGuqOppy2YXjSQ3hCcNGyof/BF1Vkx6VrgfiYPZlFtEOWTqQboR4cWiopfivi1UDJMoFhoJNtkPKo8Se6YeuKcQzhUVGCHOD5fzfYPZB9W7Umbt72hauBSqc8Uh2mqZi37/DYYZIFVRrycSnTak2K6ztcILO8P+OwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTytlje7We1TgZXFHv+7XY95Wc1VjAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAKlBdEUt5/q/La/cOriVeR6MV2joc+gRSH0beOdamuoYP/ey6bQp1y3ZdBO3fL+7vEWwJFAkpitmiPmR52xwuuH2Ry++1PkxlD9O4XggPHUnPqCdLPNnQiirqf66BkImglf18y/uQY7LSrMsz+B8KSJ844IuIt8GGqXv4+3ARuYJOGUDV5Rb5cyqpTOddnfUNo5L4Iib2kP5ldzjKOpkM9k7idchLi/IE6zfSZU6Rg4wvthpB/CvbkPUITFJsG9sB7Ha2wSkjEnCq0Q9EzWbZ+nolYN8Vhsxt3ZUKTlyX42IOpHDr2gkmdIgU64/0YACSYMgZZ6RPjR+lbcoFWnVao4=";

export class JwtService{
    public async createToken(payload: any): Promise<any>{
        try {
            return new Promise(resolve => resolve(jwt.encode(payload, secretKey)));

        } catch (error) {
            console.log(error);
        }
    }

    public async decodeToken(token: string){
        try {
            return jwt.decode(token, secretKey);
        } catch (error) {
            console.log(error);
        }
    }
}