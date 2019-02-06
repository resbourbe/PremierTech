import monserveur.MonServeur;

public class Main {

    public static void main(String args[]){

        MonServeur.getInstance().publicPrint("main");
        MonServeur.getInstance().getServiceAinterface().methodeA();
        MonServeur.getInstance().getServiceBinterface().methodeC();
        MonServeur.getInstance().getServiceBinterface().methodeD();
        MonServeur.getInstance().getServiceBinterface().methodeE();
        MonServeur.getInstance().getServiceBinterface().methodeF();
    }
}
