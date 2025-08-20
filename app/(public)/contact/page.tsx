import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto mt-10 px-4 max-w-5xl">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions or need help? Our team is here to assist you. Reach out
          via the form below or through our contact details.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea
                placeholder="Your Message"
                rows={5}
                required
              />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact details */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">support@yourlms.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-500" />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+84 123 456 789</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                123 Main Street, Thu Dau Mot City, Binh Duong, Vietnam
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
