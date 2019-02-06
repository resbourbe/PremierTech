package constructeur;

public class ConstructeurContratPDF extends ConstructeurContrat {

    public ConstructeurContratPDF(){
        contrat = new ContratPDF();
        contrat.ajouteDocument("Document PDF");
    }

    @Override
    public void construitBonDeCommande(String nomClient) {
        contrat.ajouteDocument("<PDF>Bon de commande Client : " + nomClient + "</PDF>");
    }

    @Override
    public void construitDemandeImmatriculation(String nomDemandeur) {
        contrat.ajouteDocument("<PDF>Demande dimmatriculation Demandeur : " + nomDemandeur + "</PDF>");
    }
}
