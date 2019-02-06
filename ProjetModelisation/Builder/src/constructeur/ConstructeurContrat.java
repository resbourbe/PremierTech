package constructeur;

public abstract class ConstructeurContrat {
    protected Contrat contrat;

    public abstract void construitBonDeCommande(String nomClient);

    public abstract void construitDemandeImmatriculation(String nomDemandeur);

    public Contrat resultat(){
        return contrat;
    }
}
