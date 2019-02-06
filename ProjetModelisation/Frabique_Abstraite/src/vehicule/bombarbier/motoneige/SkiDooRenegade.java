package vehicule.bombarbier.motoneige;

import vehicule.Motoneige;

public class SkiDooRenegade extends Motoneige {

    public SkiDooRenegade(int longueurChenille, int PDSF) {
        super(longueurChenille, PDSF);
    }

    @Override
    public void afficherPublicite() {
        super.afficherPublicite();
        System.out.println("Voici une Pub pour SkiDooRenegade");
    }

}
