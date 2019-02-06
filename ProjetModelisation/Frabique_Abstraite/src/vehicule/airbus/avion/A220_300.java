package vehicule.airbus.avion;

import vehicule.Avion;

public class A220_300 extends Avion {

    public A220_300(int passagerMax, int distanceFranchissable, double vitesseMaxCroisiere) {
        super(passagerMax, distanceFranchissable, vitesseMaxCroisiere);
    }

    @Override
    public void afficherPublicite() {
        super.afficherPublicite();
        System.out.println("Voici une Pub pour A220_300");
    }
}
