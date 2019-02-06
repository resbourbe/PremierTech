package banque;

public class Evaluation {
    private int noEvaluation;
    private Question q1;
    private Question q2;

    public Evaluation(int noEvaluation, char idQ1, char idQ2){
        this.noEvaluation = noEvaluation;
        switch (idQ1) {
            case 'A' :
                q1 = new QuestionA();
                break;
            case 'B' :
                q1 = new QuestionB();
                break;
            case 'C' :
                q1 = new QuestionC();
                break;
        }
        switch (idQ2) {
            case 'A' :
                q2 = new QuestionA();
                break;
            case 'B' :
                q2 = new QuestionB();
                break;
            case 'C' :
                q2 = new QuestionC();
                break;
        }
    }

    public String toString(){

        return null;
    }
}
