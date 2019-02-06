package directeur;

import constructeur.ConstructeurContrat;
import constructeur.Contrat;

public class Vendeur {

    protected ConstructeurContrat constructeur;

    public Vendeur(ConstructeurContrat constructeur){
        this.constructeur = constructeur;
    }

    public Contrat construit(String nomClient){
        constructeur.construitBonDeCommande(nomClient);
        constructeur.construitDemandeImmatriculation(nomClient);
        return constructeur.resultat();
    }
}
