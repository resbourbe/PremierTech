package banque;

import java.util.HashMap;

public class Banque {
    private static Banque ourInstance = new Banque();
    private HashMap questions;

    public static Banque getInstance() {
        return ourInstance;
    }

    private Banque() {
    }

    Question getQuestion (char id) {
        return chargerQuestion(id);
    }

    private Question chargerQuestion(char id){

        Question question = null;
        try {
            Class<Question> classeQuestion = (Class<Question>) Class.forName("banque.Question" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return question;
    }

}
