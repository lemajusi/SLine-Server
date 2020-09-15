export interface CaseDto{
    "id"?: number;
    "coordenadas": {"lat": number, "long": number};
    "titulo": string;
    "descripcion": string;
    "idUsuario": number;
}