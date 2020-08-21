const bcrypt = require('bcrypt');

export const hashingService = new class HashingService{

    public async hashPassword(plainText: string){
        try {
            return new Promise(resolve => resolve(bcrypt.hashSync(plainText, 10)));
        } catch (error) {
            console.log(error)
        }
    }

    public async comparePasswords(inPass: string, dbPass: string): Promise<any>{
        try {
            return new Promise(resolve => resolve(bcrypt.compare(inPass, dbPass)));
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
