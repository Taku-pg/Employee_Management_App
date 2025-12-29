export interface JwtPayloadModel{
    empId:number,
    role: string,
    iat: number,
    exp: number
}