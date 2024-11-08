export interface IClients {
    map(arg0: (client: any) => import("react").JSX.Element): import("react").ReactNode;
    length: number;
    content:          ClientContent[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    empty:            boolean;
}

export interface IPostClient {
    firstName:  string;
    lastName:   string;
    email:      string;
    phone:      string;
    // Aquí puedes añadir más atributos si es necesario (ej. dirección, fecha de nacimiento, etc.)
}

export interface ClientContent {
    id:          number;
    firstName:   string;
    lastName:    string;
    email:       string;
    phone:       string;
   
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted:   boolean;
    empty:    boolean;
}
