package vehicule;

public class Motoneige implements Vehicule {

    private int longueurChenille;
    private int PDSF;

    public Motoneige(int longueurChenille, int PDSF){
        this.longueurChenille = longueurChenille;
        this.PDSF = PDSF;
    }

    @Override
    public void afficherCaracteristique() {
        System.out.println("Caracteristiques");
        System.out.println("* Longueur des chenilles : " + longueurChenille);
        System.out.println("* Prix de detail suggere par le fabricant : " + PDSF);
    }

    @Override
    public void afficherPublicite() {

    }
}
