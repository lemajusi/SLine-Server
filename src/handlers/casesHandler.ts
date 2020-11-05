import { CaseDto } from "../models/case"
import { Request } from 'express';

let caseModel: CaseDto;

export const caseHandler = new class caseHandler{

    public validateBody = (caseData: CaseDto):boolean => {
        if(!caseData){
            return false;
        }

        if(caseData !== caseModel){
            return false;
        }
        
        return true;
    }
}