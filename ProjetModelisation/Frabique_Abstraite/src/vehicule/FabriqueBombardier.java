package vehicule;

import vehicule.bombarbier.avion.CRJ1000;
import vehicule.bombarbier.avion.Global8000;
import vehicule.bombarbier.motoneige.SkiDooExpeditionSport;
import vehicule.bombarbier.motoneige.SkiDooRenegade;

public class FabriqueBombardier implements  FabriqueVehicule {
    @Override
    public Avion createAvion(String Modele) {
        Avion monAvion;
        if (Modele == "CRJ1000"){
            monAvion = new CRJ1000(104,1650,0.835);
            return monAvion;
        }
        else if (Modele == "Global8000"){
            monAvion = new Global8000(17,7900,0.90);
            return monAvion;
        }
        return null;
    }

    @Override
    public Motoneige createMotoneige(String Modele) {
        Motoneige maMoto;
        if (Modele == "SkiDooExpeditionSport"){
            maMoto = new SkiDooExpeditionSport(154,10654);
            return maMoto;
        }
        else if (Modele == "SkiDooRenegade"){
            maMoto = new SkiDooRenegade(137,16704);
            return maMoto;
        }
        return null;
    }
}
