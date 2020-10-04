export interface CaseDto{
    "id_caso"?: number;
    "lat": number;
    "lng": number;
    "descripcion": string;
    "tipo_violencia": string;
    "id_usuario"?: number;
    "fecha_registro"?: string;
    "verified"?: boolean;
}