data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}
resource "aws_security_group" "todo_sg" {
  name        = "todo-api-sg"
  description = "Security group for Todo API"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Todo API"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "todo-api-sg"
  }
}
resource "aws_key_pair" "todo_key" {
  key_name   = "todo-api-key"
  public_key = file("C:/Users/lehon/.ssh/todo-api.pub")
}
resource "aws_instance" "todo_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  key_name = aws_key_pair.todo_key.key_name
  associate_public_ip_address = true
  vpc_security_group_ids = [
    aws_security_group.todo_sg.id
  ]

  tags = {
    Name = "todo-api-server"
  }
}
resource "aws_eip" "todo_ip" {
  domain = "vpc"

  tags = {
    Name = "todo-api-ip"
  }
}

resource "aws_eip_association" "todo_ip_assoc" {
  instance_id   = aws_instance.todo_server.id
  allocation_id = aws_eip.todo_ip.id
}