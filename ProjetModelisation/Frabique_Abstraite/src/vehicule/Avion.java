package vehicule;

public class Avion implements Vehicule {

    private int passagerMax;
    private double vitesseMaxCroisiere;
    private int distanceFranchissable;

    public Avion(int passagerMax, int distanceFranchissable, double vitesseMaxCroisiere){
        this.passagerMax = passagerMax;
        this.distanceFranchissable = distanceFranchissable;
        this.vitesseMaxCroisiere = vitesseMaxCroisiere;
    }

    @Override
    public void afficherCaracteristique() {
        System.out.println("Caracteristiques");
        System.out.println("* Maximum de Passager : " + passagerMax);
        System.out.println("* Distance Franchissable : " + distanceFranchissable);
        System.out.println("* Vitesse de Croisiere : " + vitesseMaxCroisiere);
    }

    @Override
    public void afficherPublicite() {

    }
}
