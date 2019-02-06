package etat;

public class EtatFermeture implements Etat {
    @Override
    public Etat envoyerCommande(int commande) {
        if (commande == 0)
            return new EtatEteint();
        return this;
    }

    @Override
    public void afficherCommande() {
        System.out.println("Les commandes");
        System.out.println("    0 - Eteindre lc PC");
    }

    @Override
    public void afficherInfo() {
        System.out.println("- - - - - - - - - - - -");
        System.out.println("ETAT ACTUEL : FERMETURE");
        System.out.println("- - - - - - - - - - - -");
    }
}
