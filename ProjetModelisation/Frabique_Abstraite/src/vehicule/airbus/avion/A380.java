package vehicule.airbus.avion;

import vehicule.Avion;

public class A380 extends Avion {

    public A380(int passagerMax, int distanceFranchissable, double vitesseMaxCroisiere) {
        super(passagerMax, distanceFranchissable, vitesseMaxCroisiere);
    }

    @Override
    public void afficherPublicite() {
        super.afficherPublicite();
        System.out.println("Voici une Pub pour A380");
    }
}
