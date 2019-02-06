package etat;

public class EtatDemarrage implements Etat {
    @Override
    public Etat envoyerCommande(int commande) {
        if (commande == 0)
            return new EtatEteint();
        if(commande == 1)
            return new EtatAuthentification();
        return this;
    }

    @Override
    public void afficherCommande() {
        System.out.println("Les commandes");
        System.out.println("    0 - Eteindre lc PC");
        System.out.println("    1 - CTRL+ALT+SUPPR");
    }

    @Override
    public void afficherInfo() {
        System.out.println("- - - - - - - - - - - -");
        System.out.println("ETAT ACTUEL : DEMARRAGE");
        System.out.println("- - - - - - - - - - - -");
    }
}
