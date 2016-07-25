package com.drakelee;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.File;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController	
public class ResourceApplication extends WebSecurityConfigurerAdapter {

	private String message = "Hello World";
	private List<Change> changes = new ArrayList<>();

    @RequestMapping(value = "/background", method = RequestMethod.GET)
    public HttpEntity<byte[]> getBackground() {
        try { 
        byte[] image;
        BufferedImage bi = ImageIO.read(new File("src/main/resources/static/img/sunset_bkg.jpg"));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        baos.flush();
        image = baos.toByteArray();
        baos.close();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(image.length);
        return new HttpEntity<byte[]>(image, headers);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public Message test() {

            File file = new File("src/main/resources/static/img/sunset_bkg.jpg");
            return new Message(file.getAbsolutePath());
    }

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Message home() {
		return new Message(message);
	}

	@RequestMapping(value = "/changes", method = RequestMethod.GET)
	public List<Change> changes() {
		return changes;
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Message update(@RequestBody Message map, Principal principal) {
		if (map.getContent() != null) {
			message = map.getContent();
			changes.add(new Change(principal.getName(), message));
			while (changes.size() > 10) {
				changes.remove(0);
			}
		}
		return new Message(message);
	}

	public static void main(String[] args) {
		SpringApplication.run(ResourceApplication.class, args);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// We need this to prevent the browser from popping up a dialog on a 401
		http.httpBasic().disable();
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/**").hasRole("WRITER").anyRequest().authenticated();
	}
}

class Message {
	private String id = UUID.randomUUID().toString();
	private String content;

	Message() {
	}

	public Message(String content) {
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public String getContent() {
		return content;
	}
}

class Change {
	private Date timestamp = new Date();
	private String user;
	private String message;

	Change() {
	}

	public Change(String user, String message) {
		this.user = user;
		this.message = message;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public String getUser() {
		return user;
	}

	public String getMessage() {
		return message;
	}
}
