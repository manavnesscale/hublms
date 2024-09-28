import frappe
from frappe import _
import random
from types import SimpleNamespace

def get_context(context):
    context.no_cache = 1
    subname = frappe.form_dict["subname"]
    doc_submission = frappe.get_doc("Hublms Quiz Submission", subname, ignore_permissions=True)
    
    quiz_name = doc_submission.quiz
    doc = frappe.get_doc("Hublms Quiz", quiz_name, ignore_permissions=True)
    quiz_dict = {
        "name": doc.name,
        "time": doc.time,
        "title": doc.title,
        "randomize_questions": doc.randomize_questions,
        "subset": doc.subset,
        "max_attempts": doc.max_attempts,
        "show_answers": doc.show_answers,
        "show_submission_history": doc.show_submission_history,
        "passing_percentage": doc.passing_percentage
    }
    quiz = SimpleNamespace(**quiz_dict)
    quiz.questions = []
    fields = ["name", "question", "type", "multiple"]
    for num in range(1, 5):
        fields.append(f"option_{num}")
        fields.append(f"is_correct_{num}")
        fields.append(f"explanation_{num}")
        fields.append(f"possibility_{num}")

    questions = frappe.get_all(
		"Hublms Quiz Question",
		filters={"parent": quiz.name},
		fields=["question", "marks"],
		order_by="idx",
	)
    # if quiz.randomize_questions == True:
    #     random.shuffle(questions)

    doc = frappe.get_doc("Hublms Quiz Submission", subname, ignore_permissions=True)
    submission_dict = {
        "name": doc.name,
        "score": doc.score,
        "creation": doc.creation
    }
    submission = SimpleNamespace(**submission_dict)
    answers = frappe.get_all(
        "Hublms Quiz Result",
        {
            "parent" : submission.name
        },
        ["*"],
        order_by="creation desc",
    )
    # questions = questions[:int(quiz.subset)]
    for question in questions:
        doc = frappe.get_doc("Hublms Question", question.question, ignore_permissions=True)
        details = {field: doc.get(field) for field in fields}
        
        details["marks"] = question.marks
        for answer_dict in answers:
            answer = SimpleNamespace(**answer_dict)
            if answer.question == details['question']:
                details["answer"] = answer.answer
                details["is_correct"] = answer.is_correct
        quiz.questions.append(details)

    no_of_attempts = frappe.db.count(
        "Hublms Quiz Submission", {"owner": frappe.session.user, "quiz": quiz_name}
    )

    print("-------------------")
    print(subname)
    print("-------------------")
        
    context.submission = submission
    context.answers = answers
    context.quiz = quiz
    context.no_of_attempts = no_of_attempts
    
    context.hide_quiz = False
    