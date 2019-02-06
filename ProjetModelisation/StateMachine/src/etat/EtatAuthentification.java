package etat;

public class EtatAuthentification implements Etat {
    @Override
    public Etat envoyerCommande(int commande) {
        if (commande == 0)
            return new EtatEteint();
        if (commande == 1)
            return new EtatFermeture();
        if (commande == 2)
            return new EtatUtilisation();
        return this;
    }

    @Override
    public void afficherCommande() {
        System.out.println("Les commandes");
        System.out.println("    0 - Eteindre lc PC");
        System.out.println("    1 - Fermer le PC");
        System.out.println("    2 - Authentification");
    }

    @Override
    public void afficherInfo() {
        System.out.println("- - - - - - - - - - - - - - - -");
        System.out.println("ETAT ACTUEL : AUTHENTIFICATION");
        System.out.println("- - - - - - - - - - - - - - - -");
    }
}
