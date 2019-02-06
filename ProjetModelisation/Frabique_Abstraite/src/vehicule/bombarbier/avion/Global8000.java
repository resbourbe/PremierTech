package vehicule.bombarbier.avion;

import vehicule.Avion;

public class Global8000 extends Avion {

    public Global8000(int passagerMax, int distanceFranchissable, double vitesseMaxCroisiere) {
        super(passagerMax, distanceFranchissable, vitesseMaxCroisiere);
    }

    @Override
    public void afficherPublicite() {
        super.afficherPublicite();
        System.out.println("Voici une Pub pour Global8000");
    }
}
