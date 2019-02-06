package constructeur;

public class ConstructeurContratHTML extends ConstructeurContrat {

    public ConstructeurContratHTML(){
        contrat = new ContratHTML();
        contrat.ajouteDocument("Documents HTML");
    }

    @Override
    public void construitBonDeCommande(String nomClient) {
        contrat.ajouteDocument("<HTML>Bon de commande Client : " + nomClient + "</HTML>");
    }

    @Override
    public void construitDemandeImmatriculation(String nomDemandeur) {
        contrat.ajouteDocument("<HTML>Demande dimmatriculation Demandeur : " + nomDemandeur + "</HTML>");
    }
}
