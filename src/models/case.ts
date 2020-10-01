export interface CaseDto{
    "idCaso"?: number;
    "lat": number;
    "lng": number;
    "descripcion": string;
    "tipoViolencia": string;
    "idUsuario"?: number;
    "fechaRegistro"?: string;
    "verified"?: boolean;
}