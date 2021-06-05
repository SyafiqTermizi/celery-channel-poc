from django.contrib.auth.views import LoginView as DjangoLoginView


class LoginView(DjangoLoginView):
    template_name = "users/login.html"
    redirect_authenticated_user = True
