package etat;

public class EtatUtilisation implements Etat {
    @Override
    public Etat envoyerCommande(int commande) {
        if (commande == 0)
            return new EtatEteint();
        if (commande == 1)
            return new EtatAuthentification();
        if (commande == 2)
            return new EtatFermeture();
        return this;
    }

    @Override
    public void afficherCommande() {
        System.out.println("Les commandes");
        System.out.println("    0 - Eteindre lc PC");
        System.out.println("    1 - Fermer la session");
        System.out.println("    2 - Fermer le PC");
    }

    @Override
    public void afficherInfo() {
        System.out.println("- - - - - - - - - - - - -");
        System.out.println("ETAT ACTUEL : UTILISATION");
        System.out.println("- - - - - - - - - - - - -");
    }
}
