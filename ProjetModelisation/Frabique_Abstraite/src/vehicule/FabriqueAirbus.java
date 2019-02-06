package vehicule;

import vehicule.airbus.avion.A220_300;
import vehicule.airbus.avion.A380;

public class FabriqueAirbus implements FabriqueVehicule {
    @Override
    public Avion createAvion(String Modele) {
        Avion monAvion;
        if (Modele == "A220_300") {
            monAvion = new A220_300(160,6112,0.82);
            return monAvion;
        }
        else if (Modele == "A380"){
            monAvion = new A380(853,15200,0.93);
            return monAvion;
        }
        return null;
    }

    @Override
    public Motoneige createMotoneige(String modele) {
        return null;
    }
}
