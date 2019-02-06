package vehicule.bombarbier.motoneige;

import vehicule.Motoneige;

public class SkiDooExpeditionSport extends Motoneige {

    public SkiDooExpeditionSport(int longueurChenille, int PDSF) {
        super(longueurChenille, PDSF);
    }

    @Override
    public void afficherPublicite() {
        super.afficherPublicite();
        System.out.println("Voici une Pub pour SkiDooExpeditionSport");
    }
}
