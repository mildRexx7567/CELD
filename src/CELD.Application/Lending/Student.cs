namespace CELD.Application.Lending;

public sealed class Student
{
    private Student()
    {
    }

    public Student(
        string studentNumber,
        string firstName,
        string lastName,
        string email)
    {
        StudentNumber = studentNumber;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }

    public string StudentNumber { get; private set; } = string.Empty;

    public string FirstName { get; private set; } = string.Empty;

    public string LastName { get; private set; } = string.Empty;

    public string Email { get; private set; } = string.Empty;
}