package monserveur;

public class MonServeur {

    private static MonServeur ourInstance = new MonServeur();
    private static ServiceA instServiceA;
    private static ServiceB instServiceB;


    public static MonServeur getInstance() {
        return ourInstance;
    }

    private MonServeur() {
        instServiceA = new ServiceA();
        instServiceB = new ServiceB();
    }

    void defaultPrint(String m){
        System.out.println("defaultPrint : " + m);
    }

    public void publicPrint(String m){
        System.out.println("publicPrint : " + m);
    }

    public ServiceAInterface getServiceAinterface(){
        return instServiceA;
    }

    public ServiceBInterface getServiceBinterface(){
        return instServiceB;
    }

    ServiceA getServiceA(){
        return instServiceA;
    }
}
