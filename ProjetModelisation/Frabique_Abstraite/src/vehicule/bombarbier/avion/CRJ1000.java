package vehicule.bombarbier.avion;

import vehicule.Avion;

public class CRJ1000 extends Avion {

    public CRJ1000(int passagerMax, int distanceFranchissable, double vitesseMaxCroisiere) {
        super(passagerMax, distanceFranchissable, vitesseMaxCroisiere);
    }

    @Override
    public void afficherPublicite() {
        super.afficherPublicite();
        System.out.println("Voici une Pub pour CRJ1000");
    }
}
