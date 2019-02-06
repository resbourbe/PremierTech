package banque;

public class Question {
    private String description;

    public Question(String description){
        this.description = description;
    }

    protected String getDescription(){
        return description;
    }

    public String toString(){
        return "Question(" + description + ")";
    }
}
