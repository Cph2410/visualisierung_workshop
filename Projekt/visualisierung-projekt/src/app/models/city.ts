import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";

export class City {
    Mietpreis: number;
    Leerstand: number;
    Quartal: Date;
    Immobilienpreis: number;
}

// TODO: If Time Use this Model for Latest Values
export class LatestCityValues {
    Name: string;
    Mietpreis: {Wert: number, From: Date};
    Leerstand: {Wert: number, From: Date};
    Immobilienpreis: {Wert: number, From: Date};
}
