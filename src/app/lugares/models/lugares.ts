export class Lugares {
    _id: number;
    nombre: string;
    direccion: string;
    img: string;
    materiales: string;
    usuario: string;
    timestamps: Date;
}

export class Lugar {
    constructor(
        public nombre: string,
        public direccion?: string,
        public img?: string,
        public materiales?: string,
        public usuario?: string,
        public timestamps?: string,
        public _id?: string
    ) { }
}
