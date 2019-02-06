import constructeur.ConstructeurContrat;
import constructeur.ConstructeurContratHTML;
import constructeur.ConstructeurContratPDF;
import constructeur.Contrat;
import directeur.Vendeur;

import java.util.Scanner;

public class Main {

    public static void main(String args[]){
        Scanner reader = new Scanner(System.in);
        ConstructeurContrat constructeurContrat;
        System.out.print("Voulez-vous construire des contrats HTML (1) ou PDF (2) : ");
        String choix = reader.next();
        if (choix.compareTo("1") == 0)
            constructeurContrat = new ConstructeurContratHTML();
        else
            constructeurContrat = new ConstructeurContratPDF();

        Vendeur vendeur = new Vendeur(constructeurContrat);

        Contrat contrat = vendeur.construit("Eric");
        contrat.imprime();
    }
}
