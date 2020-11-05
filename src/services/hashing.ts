const bcrypt = require('bcryptjs');

export const hashingService = new class HashingService{

    public async hashPassword(plainText: string){
        try {
            var salt = bcrypt.genSaltSync(10);
            return new Promise(resolve => resolve(bcrypt.hashSync(plainText, salt)));
        } catch (error) {
            console.log(error)
        }
    }

    public async comparePasswords(inPass: string, dbPass: string): Promise<any>{
        try {
            return new Promise(resolve => resolve(bcrypt.compareSync(inPass, dbPass)));
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
