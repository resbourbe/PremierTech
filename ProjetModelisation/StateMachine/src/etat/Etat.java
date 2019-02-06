package etat;

public interface Etat {
    Etat envoyerCommande(int commande);
    void afficherCommande();
    void afficherInfo();
}
