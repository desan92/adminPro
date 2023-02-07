
//model ->seria una classe en aquet cas d'usuari que conte informacio d'aquest i es crean uns metodes 
//que son utilitzants per la gestio d'aquests usuari
//interface -> per comporvar que les dades que arriban estan dintre dels parametres establerts.
export class Usuario {

    //constructor on es pasen tots els parametres que podra tenir tant si son opcionals com si son fixos.
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public role ?: string,
        public uid?: string,) {
        
    }

    imprimirUsuario(){
        console.log(this.nombre);
    }

    //metode que agafara l'imatge de l'informacio del usuari i la pasara al header i al sidebar. te 3 opcions
    get getImagen(){
        //opcions per si l'usari te una imatge.
        if(this.img)
        {
            //seria mes per si ve de google. Com que vindra amb una url doncs es clasifica amb un if.
            if(this.img!.includes('https'))
            {
                //si ve de google
                return this.img;
            }
            else
            {
                //si ve de la nostre db no vindra amb la url nomes vindra el nom de l'imatge per tant es posa a la url.
                return `http://localhost:3000/api/upload/usuarios/${this.img}`;
            }
        }
        else
        {
            //en cas de que l'usuari no tingui imatge es posara una imatge predifinida.
            return `http://localhost:3000/api/upload/usuarios/no-image`;
        }
    }
}