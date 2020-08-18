const bcrypt = require('bcrypt');

export class HashingService{

    public async hashPassword(plainText: string){
        try {
            return new Promise(resolve => resolve(bcrypt.hash(plainText, 10)));
        } catch (error) {
            console.log(error)
        }
    }

    public async comparePasswords(inPass: string, dbPass: string){
        try {
            return new Promise(resolve => resolve(bcrypt.compareSync(inPass, dbPass)));
        } catch (error) {
            console.log(error)
        }
    }
}
