package vehicule;

public interface FabriqueVehicule {
    Motoneige createMotoneige(String Modele);
    Avion createAvion(String Modele);
}
