import vehicule.FabriqueAirbus;
import vehicule.FabriqueBombardier;
import vehicule.Vehicule;
import vehicule.FabriqueVehicule;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String args[]){
        List<Vehicule> mesVehicules = new ArrayList<>();
        FabriqueVehicule fabrique;

        fabrique = new FabriqueAirbus();
        mesVehicules.add(fabrique.createAvion("A380"));
        mesVehicules.add(fabrique.createAvion("A220_300"));

        fabrique = new FabriqueBombardier();
        mesVehicules.add(fabrique.createAvion("CRJ1000"));
        mesVehicules.add(fabrique.createAvion("Global8000"));
        mesVehicules.add(fabrique.createMotoneige("SkiDooExpeditionSport"));
        mesVehicules.add(fabrique.createMotoneige("SkiDooRenegade"));

        for (Vehicule vehicule: mesVehicules){
            vehicule.afficherCaracteristique();
            vehicule.afficherPublicite();
            System.out.println();
        }
    }
}
