package monserveur;

public class ServiceA  extends Service implements ServiceAInterface{

    public ServiceA(){

    }

    public void methodeA(){
        MonServeur.getInstance().defaultPrint("A");
    }

    public void methodeB(){
        MonServeur.getInstance().publicPrint("B");
    }
}
