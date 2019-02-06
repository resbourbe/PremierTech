package etat;

public class EtatEteint implements Etat{
    @Override
    public Etat envoyerCommande(int commande) {
        if (commande == 0)
            return new EtatDemarrage();
        return this;
    }

    @Override
    public void afficherCommande() {
        System.out.println("Les commandes");
        System.out.println("    0 - Demarrer lc PC");
    }

    @Override
    public void afficherInfo() {
        System.out.println("- - - - - - - - - - -");
        System.out.println("ETAT ACTUEL : ETEINT");
        System.out.println("- - - - - - - - - - -");
    }
}
