export class Materiales {
    _id: string;
    asignado: boolean;
    cantidad: number;
    title: string;
    img: string;
    usuario: string;
    lugar: string;
    timestamps: Date;
}


export class Material {
    constructor(
        public title: string,
        public cantidad: number,
        public timestamps?: Date,
        public lugar?: string,
        public usuario?: string,
        public img?: string,
        public asignado?: boolean,
        public _id?: string,
    ) { }
}
