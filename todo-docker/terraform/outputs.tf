output "elastic_ip" {
  value = aws_eip.todo_ip.public_ip
}