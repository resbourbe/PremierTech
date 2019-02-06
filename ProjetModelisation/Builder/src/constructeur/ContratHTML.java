package constructeur;

public class ContratHTML extends Contrat {

    @Override
    public void ajouteDocument(String Document) {
        documents.add(Document);
    }

    @Override
    public void imprime() {
        for (String monDoc: documents){
            System.out.println(monDoc);
        }
    }
}
